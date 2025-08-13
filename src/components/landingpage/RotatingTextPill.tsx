"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  texts: string[]
  interval?: number
  transitionMs?: number
  pillClassName?: string
  wordClassName?: string
  pauseOnHover?: boolean
}

export function RotatingTextPill({
  texts,
  interval = 2200,
  transitionMs = 500,
  pillClassName = "",
  wordClassName = "",
  pauseOnHover = true,
}: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [minW, setMinW] = useState<number>(0)

  const wrapperRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<number | null>(null)
  const fadeRef = useRef<number | null>(null)
  const roRef = useRef<ResizeObserver | null>(null)

  const longestText = useMemo(
    () => texts.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [texts]
  )

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (fadeRef.current) clearTimeout(fadeRef.current)
  }

  const schedule = () => {
    clearTimers()
    fadeRef.current = window.setTimeout(
      () => setVisible(false),
      Math.max(0, interval - transitionMs)
    )
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % texts.length)
      setVisible(true)
      schedule()
    }, interval)
  }

  // mede a largura da maior frase na FONTE atual do h1
  const measure = () => {
    const el = wrapperRef.current
    if (!el) return
    const cs = getComputedStyle(el)

    const font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontStretch} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}`
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.font = font
    const textWidth = ctx.measureText(longestText).width

    // soma o padding horizontal real do pill
    const padH =
      parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0")

    setMinW(Math.ceil(textWidth + padH))
  }

  useEffect(() => {
    schedule()
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // pausa no hover
  useEffect(() => {
    if (!pauseOnHover || !wrapperRef.current) return
    const el = wrapperRef.current
    const onEnter = () => clearTimers()
    const onLeave = () => schedule()
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseOnHover])

  // medir ao montar e quando a fonte/tamanho mudar (via ResizeObserver do h1)
  useEffect(() => {
    measure()
    const el = wrapperRef.current
    if (!el) return

    // observa o elemento PAI (span dentro do h1) para refletir mudanças de layout
    const target = el.parentElement ?? el
    const ro = new ResizeObserver(() => measure())
    ro.observe(target)
    roRef.current = ro
    return () => {
      ro.disconnect()
      roRef.current = null
    }
  }, [longestText])

  return (
    // dentro do return:
    <span
      ref={wrapperRef}
      className={[
        "inline-flex items-center rounded-2xl whitespace-nowrap",
        "text-[inherit] leading-none",         // herda tamanho/line-height do h1
        pillClassName,
      ].join(" ")}
      style={{
        fontFamily: "inherit",                 // mesma família do h1
        fontWeight: "inherit",                 // mesmo peso do h1
        transition: `opacity ${transitionMs}ms ease`,
        opacity: visible ? 1 : 0,
        minWidth: minW || undefined,           // evita “pulos” de largura
      }}
    >
      {/* sem font-medium para não mudar o peso do h1 */}
      <span className={wordClassName}>{texts[index]}</span>
    </span>

  )
}

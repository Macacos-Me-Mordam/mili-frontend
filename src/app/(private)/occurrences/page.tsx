import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const mockOccurrences = [
  {
    id: 1,
    location: 'Portaria Principal',
    camera: 'Câmera 01',
    date: '12/06/2025 10:30',
    imageUrl: 'https://picsum.photos/seed/1/400/300',
    verified: false,
  },
  {
    id: 2,
    location: 'Estacionamento - Setor A',
    camera: 'Câmera 05',
    date: '12/06/2025 09:45',
    imageUrl: 'https://picsum.photos/seed/2/400/300',
    verified: false,
  },
  {
    id: 3,
    location: 'Refeitório',
    camera: 'Câmera 08',
    date: '12/06/2025 08:15',
    imageUrl: 'https://picsum.photos/seed/3/400/300',
    verified: false,
  },
  {
    id: 4,
    location: 'Corredor Administrativo',
    camera: 'Câmera 03',
    date: '11/06/2025 18:00',
    imageUrl: 'https://picsum.photos/seed/4/400/300',
    verified: false,
  },
  {
    id: 5,
    location: 'Corredor Administrativo',
    camera: 'Câmera 03',
    date: '11/06/2025 18:00',
    imageUrl: 'https://picsum.photos/seed/4/400/300',
    verified: false,
  },
  {
    id: 6,
    location: 'Corredor Administrativo',
    camera: 'Câmera 03',
    date: '11/06/2025 18:00',
    imageUrl: 'https://picsum.photos/seed/4/400/300',
    verified: false,
  },
]

export default function OccurrencesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Visualizar Ocorrências</h1>
      <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {mockOccurrences.map((occurrence) => (
          <Card
            key={occurrence.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-80 w-60 flex flex-col"
          >
            <CardHeader className="p-0">
              <div className="relative w-full h-20">
                <Image
                  src={occurrence.imageUrl}
                  alt={`Ocorrência em ${occurrence.location}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 gap-2 p-3">
              <div>
                <CardDescription className="text-xs text-muted-foreground mb-0.5">Local da Ocorrência</CardDescription>
                <CardTitle className="text-sm font-semibold">{occurrence.location}</CardTitle>
              </div>
              <div>
                <CardDescription className="text-xs text-muted-foreground mb-0.5">Nome da Câmera</CardDescription>
                <p className="text-sm font-medium">{occurrence.camera}</p>
              </div>
              <div>
                <CardDescription className="text-xs text-muted-foreground mb-0.5">Data</CardDescription>
                <p className="text-xs text-muted-foreground">{occurrence.date}</p>
              </div>
              {!occurrence.verified && (
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-500 text-xs mt-1"
                >
                  <span className="w-2 h-2 mr-1.5 rounded-full bg-orange-500"></span>
                  Não Verificado
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
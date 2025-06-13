import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

const mockCameras = [
  { id: 1, name: 'Câmera 01', address: 'Hall de entrada', status: 'online', imageUrl: 'https://picsum.photos/seed/cam1/400/300' },
  { id: 2, name: 'Câmera 02', address: 'Corredor Leste', status: 'online', imageUrl: 'https://picsum.photos/seed/cam2/400/300' },
  { id: 3, name: 'Câmera 03', address: 'Pátio Externo', status: 'offline', imageUrl: 'https://picsum.photos/seed/cam3/400/300' },
  { id: 4, name: 'Câmera 04', address: 'Refeitório', status: 'online', imageUrl: 'https://picsum.photos/seed/cam4/400/300' },
  { id: 5, name: 'Câmera 05', address: 'Estacionamento', status: 'online', imageUrl: 'https://picsum.photos/seed/cam5/400/300' },
  { id: 6, name: 'Câmera 05', address: 'Estacionamento', status: 'online', imageUrl: 'https://picsum.photos/seed/cam5/400/300' },

  { id: 7, name: 'Câmera 05', address: 'Estacionamento', status: 'online', imageUrl: 'https://picsum.photos/seed/cam5/400/300' },

  { id: 8, name: 'Câmera 05', address: 'Estacionamento', status: 'online', imageUrl: 'https://picsum.photos/seed/cam5/400/300' },

];

export default function CamerasStatusPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Status das Câmeras</h1>
        <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {mockCameras.map((camera) => (
          <Link href={`/cameras/${camera.id}`} key={camera.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-80 w-60 flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full h-32">
                  <Image
                    src={camera.imageUrl}
                    alt={`Imagem da ${camera.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${camera.status === 'online' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                    variant="outline"
                  >
                    <span className={`w-2 h-2 mr-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {camera.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{camera.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{camera.address}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
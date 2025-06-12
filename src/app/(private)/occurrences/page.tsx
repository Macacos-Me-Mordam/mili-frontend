import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

// Dados Mockados para as ocorrências
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
]

export default function OccurrencesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Visualizar Ocorrências</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockOccurrences.map((occurrence) => (
          <Card key={occurrence.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="p-0">
              <div className="relative w-full h-40">
                <Image
                  src={occurrence.imageUrl}
                  alt={`Ocorrência em ${occurrence.location}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <div>
                <CardDescription>Local da Ocorrência</CardDescription>
                <CardTitle className="text-lg">{occurrence.location}</CardTitle>
              </div>
              <div>
                <CardDescription>Nome da Câmera</CardDescription>
                <p className="font-semibold">{occurrence.camera}</p>
              </div>
              <div>
                <CardDescription>Data</CardDescription>
                <p className="text-sm text-muted-foreground">{occurrence.date}</p>
              </div>
              {!occurrence.verified && (
                 <Badge variant="outline" className="border-orange-500 text-orange-500">
                    <span className="w-2 h-2 mr-2 rounded-full bg-orange-500"></span>
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
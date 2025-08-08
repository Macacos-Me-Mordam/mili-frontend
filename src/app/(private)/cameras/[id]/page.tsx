'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from "next/navigation";

const mockCameras = [
    { id: 1, name: 'Câmera 01', address: 'Hall de entrada', status: 'online', imageUrl: 'https://picsum.photos/seed/cam1/1280/720', model: 'AXIS P1375-E', serial: 'AC-172-88-19', lastMaintenance: '01/03/2025' },
    { id: 2, name: 'Câmera 02', address: 'Corredor Leste', status: 'online', imageUrl: 'https://picsum.photos/seed/cam2/1280/720', model: 'AXIS M1135', serial: 'AC-172-88-20', lastMaintenance: '15/02/2025' },
    { id: 3, name: 'Câmera 03', address: 'Pátio Externo', status: 'offline', imageUrl: 'https://picsum.photos/seed/cam3/1280/720', model: 'BOSCH DINION IP 3000i', serial: 'BC-111-45-11', lastMaintenance: '20/05/2025' },
    { id: 4, name: 'Câmera 04', address: 'Refeitório', status: 'online', imageUrl: 'https://picsum.photos/seed/cam4/1280/720', model: 'AXIS P1375-E', serial: 'AC-172-88-21', lastMaintenance: '10/01/2025' },
    { id: 5, name: 'Câmera 05', address: 'Estacionamento', status: 'online', imageUrl: 'https://picsum.photos/seed/cam5/1280/720', model: 'BOSCH DINION IP 3000i', serial: 'BC-111-45-12', lastMaintenance: '05/06/2025' },
];

export default function SingleCameraPage() {
    const params = useParams();
    const cameraId = params.id;
    const camera = mockCameras.find(c => c.id.toString() === cameraId);

    if (!camera) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h2 className="text-2xl font-bold">Câmera não encontrada</h2>
                <p className="text-muted-foreground">A câmera que você está procurando não existe.</p>
                <Button asChild className="mt-6">
                    <Link href="/cameras">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Status das Câmeras
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/cameras">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-bold tracking-tight">{`${camera.name} - ${camera.address}`}</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 lg:w-3/4">
                    <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
                        <Image
                            src={camera.imageUrl}
                            alt={`Visualização da ${camera.name}`}
                            layout="fill"
                            objectFit="cover"
                        />
                         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
                            {camera.status === 'offline' && (
                                <div className="text-center p-4 bg-black/50 rounded-lg">
                                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto"/>
                                    <p className="text-white font-semibold mt-2">CÂMERA OFFLINE</p>
                                </div>
                            )}
                         </div>
                    </div>
                </div>

                <div className="lg:w-1/4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalhes da Câmera</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge 
                                    className={`${camera.status === 'online' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                                    variant="outline"
                                >
                                    <span className={`w-2 h-2 mr-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {camera.status === 'online' ? 'Online' : 'Offline'}
                                </Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Endereço</span>
                                <span className="text-sm font-semibold">{camera.address}</span>
                            </div>
                             <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Modelo</span>
                                <span className="text-sm font-semibold">{camera.model}</span>
                            </div>
                             <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Número de Série</span>
                                <span className="text-sm font-semibold">{camera.serial}</span>
                            </div>
                             <Separator />
                             <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Última Manutenção</span>
                                <span className="text-sm font-semibold">{camera.lastMaintenance}</span>
                            </div>
                            <Separator />
                             <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                                Gerar Ocorrência
                             </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
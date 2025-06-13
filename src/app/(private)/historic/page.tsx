<<<<<<< HEAD
import '@/app/globals.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
        verified: true,
    },
]

function groupOccurrences(data: typeof mockOccurrences) {
    return {
        verified: data.filter(item => item.verified),
        notVerified: data.filter(item => !item.verified),
    };
}

function OccurrenceGrid({ data }: { data: typeof mockOccurrences }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
            {data.map((occurrence) => (
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
                        {occurrence.verified ? (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                                <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                                Concluído
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="border-red-500 text-red-500">
                                <span className="w-2 h-2 mr-2 rounded-full bg-red-500"></span>
                                Falha
                            </Badge>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function HistoricofCollect() {
    const { verified, notVerified } = groupOccurrences(mockOccurrences);
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Histórico de Ocorrências</h1>

            <Accordion type="multiple" className="w-full">
                <AccordionItem value="verified">
                    <AccordionTrigger>Ocorrências Verificadas</AccordionTrigger>
                    <AccordionContent>
                        <OccurrenceGrid data={verified} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="not-verified">
                    <AccordionTrigger>Ocorrências com Falhas (Não Verificadas)</AccordionTrigger>
                    <AccordionContent>
                        <OccurrenceGrid data={notVerified} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}


=======
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HistoricOfCollect() {
    const collects = [
        { id: 1, nome: "Coleta 001", status: "pendente" },
        { id: 2, nome: "Coleta 002", status: "pendente" },
        { id: 3, nome: "Coleta 003", status: "concluido" },
        { id: 4, nome: "Coleta 004", status: "concluido" },
    ];


    return (
        <div className="ml-3 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-md p-4 bg-white rounded-xl">
                <Accordion type="multiple">
                    <AccordionItem value="pendentes">
                        <AccordionTrigger>Pendentes</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 mt-2">
                                {collects
                                    .filter((item) => item.status === "pendente")
                                    .map((item) => (
                                        <div key={item.id} className="bg-gray-200 rounded-lg h-12 flex items-center px-4 text-gray-800">
                                            {item.nome}
                                        </div>
                                    ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="concluidos">
                        <AccordionTrigger>Concluídos</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 mt-2">
                                {collects
                                    .filter((item) => item.status === "concluido")
                                    .map((item) => (
                                        <div key={item.id} className="bg-gray-200 rounded-lg h-12 flex items-center px-4 text-gray-800">
                                            {item.nome}
                                        </div>
                                    ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </div>
    );
}
>>>>>>> b29514dda9fc1af526fbaaf928280e6d0a7e4232

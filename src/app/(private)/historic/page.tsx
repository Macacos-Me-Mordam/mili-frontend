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

import { Heading, VStack, SectionList } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { useState } from 'react';

export function History() {

    const [exercises, setExercises] = useState([
        {
            title: "06.11.22",
            data: ["Puxada frontal", "Remada unilateral"]
        },
        {
            title: "07.11.22",
            data: ["Costas"]
        }
    ]);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            <SectionList 
                sections={exercises}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
                        {section.title}
                    </Heading>
                )}
                px={8}
            />
        </VStack>
    )
}
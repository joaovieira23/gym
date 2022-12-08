import { Heading, HStack, Icon, Text, VStack, Image, Box, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

type RouteParamsProps = {
    exerciseId: string;
};

export function Exercise() {
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
    const { goBack } = useNavigation<AppNavigatorRoutesProps>();
    const toast = useToast();

    const route = useRoute();

    const { exerciseId } = route.params as RouteParamsProps;

    function handleGoBack() {
        goBack();
    };

    async function fetchExerciseDetails() {
        try {
            const response = await api.get(`/exercises/${exerciseId}`);
            console.warn(response.data);
            setExercise(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    };

    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId]);

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon 
                        as={Feather} 
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
                    <Heading color="gray.100" fontSize='lg' flexShrink={1} fontFamily="heading">
                        {exercise.name}
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>   

            <VStack p={8}>
                <Box rounded="lg" mb={3} overflow="hidden">
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                        alt="Nome do exercício"
                        resizeMode="cover"
                        rounded="lg"
                        // overflow="hidden"
                    />
                </Box>

                <Box bg="gray.600" rounded="md" pb={4} px={4}>
                    <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                        <HStack>
                            <SeriesSvg />
                            <Text color="gray.200" ml={2}>
                                {exercise.series} séries
                            </Text>
                        </HStack>

                        <HStack>
                            <SeriesSvg />
                            <Text color="gray.200" ml={2}>
                                {exercise.repetitions} repetições
                            </Text>
                        </HStack>
                    </HStack>
                    
                    <Button title="Marcar como realizado" />
                </Box>
            </VStack>
        </VStack>
    )
}
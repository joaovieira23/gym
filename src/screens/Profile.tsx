import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, ScrollView, VStack, Skeleton } from 'native-base';
import { useState } from 'react';

const PHOTO_SIZE = 33;

export function Profile() {

    const [photoIsLoading, setPhotoIsLoading] = useState(true);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView>
                    <Center mt={6} px={10}>
                {
                        photoIsLoading ?
                        <Skeleton 
                            w={PHOTO_SIZE} 
                            h={PHOTO_SIZE} 
                            rounded="full"
                            startColor="gray.400"
                            endColor="gray.300"
                        /> :
                        <UserPhoto
                            source={{ uri: 'http://github.com/joaovieira23.png' }}
                            alt="Foto do usuário"
                            size={PHOTO_SIZE}
                        />
                }
                    </Center>
            </ScrollView>
        </VStack>
    )
}
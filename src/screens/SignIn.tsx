import { Controller, useForm } from 'react-hook-form';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import BackgroundImg from '@assets/background.png';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';

type FormData = {
    email: string;
    password: string;
};

export function SignIn() {

    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const { signIn } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNewAccount() {
        navigate('signUp')
    };

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await signIn(email, password);
        } catch(error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

            setIsLoading(false);
        }
    };

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
        <VStack flex={1} px="10" pb={16}>
            <Image
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                alt="Pessoas treinando"
                resizeMode='contain'
                position="absolute"
            /> 

            <Center my={24}>
                <LogoSvg />

                <Text color="gray.100" fontSize="sm">
                    Treine sua mente e o seu corpo
                </Text>
            </Center>

            <Center >
                <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                    Acesse sua conta
                </Heading>

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Informe o e-mail' }}
                    render={({ field: { onChange } }) => (
                        <Input 
                            placeholder='E-mail' 
                            keyboardType='email-address'
                            onChangeText={onChange}
                            errorMessage={errors.email?.message}
                            autoCapitalize='none'
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Informe a senha' }}
                    render={({ field: { onChange } }) => (
                        <Input 
                            secureTextEntry
                            placeholder='Senha'
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />

                <Button 
                    onPress={handleSubmit(handleSignIn)}
                    title="Acessar" 
                    isLoading={isLoading}
                />
            </Center>

            <Center mt={24}>
                <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                    Ainda não tem acesso?
                </Text>

                <Button 
                    title="Criar conta" 
                    variant="outline" 
                    onPress={handleNewAccount }
                />
            </Center>
        </VStack>
        </ScrollView>
    );
}
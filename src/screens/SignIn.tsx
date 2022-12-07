import { Controller, useForm } from 'react-hook-form';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import BackgroundImg from '@assets/background.png';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';

type FormData = {
    email: string;
    password: string;
};

export function SignIn() {

    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNewAccount() {
        navigate('signUp')
    };

    function handleSignIn({ email, password }: FormData) {
        signIn(email, password);
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
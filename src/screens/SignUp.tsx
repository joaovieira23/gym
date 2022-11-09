import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import BackgroundImg from '@assets/background.png';

import { useForm, Controller } from 'react-hook-form';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
    const { control } =  useForm();

    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
    }

    function handleSignUp() {
    }

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
                    Crie sua conta
                </Heading>
                
                <Controller 
                    control={control}
                    name="name"
                    render={({ field : {onChange, value}}) => (
                        <Input 
                            placeholder='Nome'
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller 
                    control={control}
                    name="email"
                    render={({ field : {onChange, value}}) => (
                        <Input 
                            placeholder='E-mail' 
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller 
                    control={control}
                    name="password"
                    render={({ field : {onChange, value}}) => (
                        <Input 
                            placeholder='Senha' 
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller 
                    control={control}
                    name="password_confirm"
                    render={({ field : {onChange, value}}) => (
                        <Input 
                            placeholder='Confirme sua senha' 
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />


                <Button 
                    title="Criar e acessar" 
                    onPress={handleSignUp}
                />
            </Center>

                <Button 
                    onPress={handleGoBack}
                    title="Voltar para o login" 
                    variant="outline" 
                    mt={24}
                />
        </VStack>
        </ScrollView>
    );
}
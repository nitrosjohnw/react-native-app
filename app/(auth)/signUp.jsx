import { View, Text, Image, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const signUp = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.userName || !form.email || !form.password){
      Alert.alert('Error', 'Please fill all fields')
    }
    setisSubmitting(true);

    try{
      const result = await createUser(form.email,form.password,form.userName)
      router.replace('/home')
    }catch(error){
      Alert.alert('error', error.message)
    }finally{
      setisSubmitting(false);
    }
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView>
            <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
              <Image source={images.logo} resizeMode='contain'
                className='w-[115px] h-[35px]' />

              <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Aora</Text>
              <FormField
                title="Username"
                value={form.userName}
                handleChangeText={(e) => setForm({ ...form, userName: e })}
                otherStyles='mt-10'

              />
              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles='mt-7'
                keyboardTyle='email-address'
              />
              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles='mt-7'
              />

              <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
              />
              <View className='justify-center pt-5 flex-row gap-2'>
                <Text className='text-lg text-gray-100 font-pregular'>Have An Account Already</Text>
                <Link href='/signIn' className='text-lg font-psemibold text-secondary'>Log in</Link>

              </View>


            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>

  )
}

export default signUp
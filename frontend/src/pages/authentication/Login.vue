<template>
  <div class="column items-center justify-center window-width window-height">
    <div class="background">
    </div>
    <div>
      <q-carousel
        v-model="slide"
        transition-prev="flip-left"
        transition-next="flip-right"
        animated
        class="login-container no-scroll"
        style="height: 450px"
      >
        <q-carousel-slide name="login">
          <div>
            <p class="text-h3 text-center">Login</p>
            <p class="text-subtitle1 text-center">Digite seu email e sua senha para efetuar o login</p>
          </div>

          <div>
            <q-form ref="loginForm" class="q-gutter-sm">
              <q-input filled v-model="email" label="E-mail" lazy-rules :rules="validations.email">
                <template v-slot:prepend>
                  <q-icon name="email"/>
                </template>

                <template v-slot:append>
                  <q-icon v-if="email.length > 0" name="close" @click="email = ''" class="cursor-pointer"/>
                </template>
              </q-input>

              <q-input filled bottom-slots v-model="password" label="Senha" type="password" lazy-rules
                       :rules="validations.password">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>

                <template v-slot:append>
                  <q-icon v-if="password.length > 0" name="close" @click="password = ''" class="cursor-pointer"/>
                </template>
              </q-input>

            </q-form>
          </div>

          <div class="flex full-width justify-between">
            <div class="text-left" style="font-size: small">
              <q-btn flat rounded size="sm" @click="slide = 'signin'">Criar uma conta</q-btn>
            </div>
            <div class="text-right" style="font-size: small">
              <q-btn flat rounded size="sm" @click="onClickRecovery">Esqueceu sua senha?</q-btn>
            </div>
          </div>

          <div class="rows justify-center items-center q-pa-md">
            <q-btn
              v-if="slide === 'login'"
              class="full-width"
              color="primary"
              @click="onClickLogin"
              @keyup.enter="onClickLogin()"
            >Entrar</q-btn>
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="signin">
          <div>
            <p class="text-h3 text-center">Sign in</p>
            <p class="text-subtitle1 text-center">Complete o formulário e crie sua conta</p>
          </div>

          <div>
            <q-form ref="signinForm" class="q-gutter-sm">
              <q-input filled v-model="signinFullName" label="Nome Completo" lazy-rules :rules="validations.required">
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>

                <template v-slot:append>
                  <q-icon v-if="signinFullName.length > 0" name="close" @click="signinFullName = ''" class="cursor-pointer"/>
                </template>
              </q-input>

              <q-input filled v-model="signinEmail" label="E-mail" lazy-rules :rules="validations.email">
                <template v-slot:prepend>
                  <q-icon name="email"/>
                </template>

                <template v-slot:append>
                  <q-icon v-if="signinEmail.length > 0" name="close" @click="signinEmail = ''" class="cursor-pointer"/>
                </template>
              </q-input>

              <q-input filled bottom-slots v-model="signinPassword" label="Senha" type="password" lazy-rules
                       :rules="validations.password">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>

                <template v-slot:append>
                  <q-icon v-if="signinPassword.length > 0" name="close" @click="signinPassword = ''" class="cursor-pointer"/>
                </template>
              </q-input>

            </q-form>
          </div>

          <div class="rows justify-between items-center q-pa-md">
            <q-btn color="primary" icon="arrow_back" @click="onClickGoBack" />
            <q-btn
              v-if="slide === 'signin'"
              style="width: 70%; margin-left: 5px"
              color="primary"
              @click="onClickSignin"
              @keyup.enter="onClickSignin"
            >Criar</q-btn>
          </div>
        </q-carousel-slide>
      </q-carousel>


    </div>

  </div>

</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {useAuthStore} from 'src/pinia/auth';
import {computed, ref} from 'vue';
import {QForm} from 'quasar';
import allValidations from 'src/validations';
import {IUserCreate} from 'src/interfaces/IUser';
import {useUserStore} from 'src/pinia/user';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const loginForm = ref<QForm | null>(null);
const signinForm = ref<QForm | null>(null);
const signinEmail = ref('');
const signinPassword = ref('');
const signinFullName = ref('');

const email = ref('');
const password = ref('');

const slide = ref('login');

async function onClickLogin() {

  const isValid = await loginForm?.value?.validate()
  if (isValid) {
    await authStore.getAccessToken(email.value, password.value);
    await router.push({name: 'index-home-admin'});
  }
}

async function onClickSignin() {

  const isValid = await signinForm?.value?.validate();

  if (!isValid) {
    return
  }

  const createUser: IUserCreate = {
    email: signinEmail.value,
    full_name: signinFullName.value,
    is_active: true,
    password: signinPassword.value,
  }

  await userStore.createUser(createUser);

  onClickGoBack();
}

function onClickGoBack() {
  signinEmail.value = '';
  signinFullName.value = '';
  signinPassword.value = '';
  slide.value = 'login';
}

async function onClickRecovery() {
  await router.push({name: 'index-password-recovery'});
}

const validations = computed(() => {
  return allValidations;
})

</script>

<style scoped>
.background {
  background-image: url("src/assets/blob-scene-haikei.svg");
  background-repeat: repeat-x;
  width: 100vw;
  height: 100vh;
  position: absolute;
}

.login-container {
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>

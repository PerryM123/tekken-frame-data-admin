<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserMeStore } from '~/store/userMe';

const userMeStore = useUserMeStore();
const {
  name,
  id,
  accountCreatedDate,
  birthDay,
  birthMonth,
  birthYear,
  email,
  phoneNumber,
  role
} = storeToRefs(userMeStore);
</script>
<template>
  <div class="">This is profile</div>
  <ul>
    <li><b>name:</b> {{ name || '-' }}</li>
    <li><b>id:</b> {{ id || '-' }}</li>
    <li><b>accountCreatedDate:</b> {{ accountCreatedDate || '-' }}</li>
    <li><b>birthDay:</b> {{ birthDay || '-' }}</li>
    <li><b>birthMonth:</b> {{ birthMonth || '-' }}</li>
    <li><b>birthYear:</b> {{ birthYear || '-' }}</li>
    <li><b>email:</b> {{ email || '-' }}</li>
    <li><b>phoneNumber:</b> {{ phoneNumber || '-' }}</li>
    <li><b>role:</b> {{ role }}</li>
  </ul>
</template>
<style scoped lang="scss"></style>

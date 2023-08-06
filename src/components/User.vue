<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ROLE_TITLES } from '~/utils/constants';
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

const getRoleName = (role?: number) => {
  if (role === ROLE_TYPE.ADMIN) return ROLE_TITLES.ADMIN;
  if (role === ROLE_TYPE.USER) return ROLE_TITLES.USER;
  return ROLE_TITLES.GUEST;
};
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
    <li><b>role:</b> {{ getRoleName(role) }}</li>
  </ul>
</template>
<style scoped lang="scss"></style>

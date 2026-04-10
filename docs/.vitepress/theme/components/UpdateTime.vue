<template>
  <span class="update-time">
    🕐 <em>最后更新时间：{{ formattedTime }}</em>
  </span>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

const formatTime = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('zh-CN', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '未知时间';
  }
};

const formattedTime = ref('2025年7月');

onMounted(async () => {
  try {
    const response = await fetch('/update-time.json');
    if (response.ok) {
      const data = await response.json();
      if (data && data.time) {
        formattedTime.value = formatTime(data.time);
      }
    }
  } catch (error) {
    // fall back to static default
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.update-time {
  color: #666;
  font-style: italic;
  font-size: 0.9em;
}
</style>

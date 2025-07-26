<template>
  <span class="update-time">
    🕐 <em>最后更新时间：{{ formattedTime }}</em>
  </span>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const updateTime = ref('2025年7月');
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
    console.log('UpdateTime component mounted - loading update time');
    const possiblePaths = ['/update-time.json', '../update-time.json', './update-time.json'];
    let data = null;
    
    for (const path of possiblePaths) {
      try {
        console.log(`Trying to fetch update time from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          data = await response.json();
          console.log(`Successfully loaded update time from ${path}:`, data);
          break;
        }
      } catch (e) {
        console.log(`Failed to fetch update time from ${path}:`, e);
      }
    }
    
    if (data && data.time) {
      updateTime.value = data.time;
      formattedTime.value = formatTime(data.time);
      console.log('Updated with real update time:', formattedTime.value);
    } else {
      console.log('Using default update time');
      formattedTime.value = '2025年7月';
    }
  } catch (error) {
    console.error('Failed to load update time:', error);
    formattedTime.value = '2025年7月';
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

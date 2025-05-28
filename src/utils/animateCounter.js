
export const animateCounter = (start, end, duration, callback) => {
  const startTime = performance.now();
  const range = end - start;
  
  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(start + range * easeOutQuart);
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };
  
  requestAnimationFrame(updateCounter);
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const generateRandomData = (count, min = 0, max = 100) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

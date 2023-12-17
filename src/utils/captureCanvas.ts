export const captureCanvas = () => {
  const canvas = document.body.getElementsByTagName("canvas")[0];
  if (!canvas) {
    return;
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "canvas.png";
  link.click();

  setTimeout(() => {
    link.remove();
  }, 0);
};

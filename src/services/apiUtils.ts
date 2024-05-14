export function buildUrl(url: string, obj: { [key: string]: string }) {
  let resultUrl = url;
  Object.entries(obj).forEach(([k, v]) => {
    resultUrl = resultUrl.replace(`{${k}}`, v);
  });
  return resultUrl;
}

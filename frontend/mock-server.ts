const resolveByTimout = (data: any) =>
  new Promise((resolve) => setTimeout(resolve, 1000, data))

export const getSSRDataExample = () => resolveByTimout({ title: 'Example' })




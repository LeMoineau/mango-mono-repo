export default interface Chapter {
  title: string;
  number: string;
  image: string;
  id: string;
  manga: {
    title: string;
    id: string;
  };
}

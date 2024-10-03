import { useSelector } from "react-redux";

const LoadingScreen = () => {
  const loading = useSelector((state) => state.loading.isLoading);

  if (!loading) return null;

  return (
    <div className="bg-black/50 fixed h-screen w-screen left-0 top-0 z-50 flex items-center justify-center">
      <div className="w-[50px] aspect-square rounded-[50%] border-8 border-solid border-white/90 border-r-blue-500 animate-spinner_normal" />
    </div>
  );
};

export default LoadingScreen;

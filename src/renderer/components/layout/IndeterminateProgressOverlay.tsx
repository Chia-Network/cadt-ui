import { Spinner } from '@/components';

const IndeterminateProgressOverlay = ({ style = {} }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex justify-center items-center" style={style}>
    <div className="w-full h-full flex justify-center items-center">
      <Spinner aria-label="Loading" size="xl" />
    </div>
  </div>
);

export { IndeterminateProgressOverlay };

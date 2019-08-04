import Loading from '@/common/Loading/Loading';

export function AsyncComponent(component, loading = Loading, error, delay = 200, timeout = 5000) {
  const AsyncHander = () => ({
    component,
    loading,
    error,
    delay,
    timeout
  });
  return Promise.resolve({
    functional: true,
    render: (h, { data, children }) => h(AsyncHander, data, children)
  });
}
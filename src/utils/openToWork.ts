const OPEN_TO_WORK_KEY = 'openToWork';

export const isOpenToWork = (): boolean => {
  try {
    const v = localStorage.getItem(OPEN_TO_WORK_KEY);
    if (v === null) return true; // default to visible
    return v === 'true';
  } catch (err) {
    console.warn('localStorage unavailable', err);
    return true;
  }
};

export const setOpenToWork = (value: boolean) => {
  try {
    localStorage.setItem(OPEN_TO_WORK_KEY, value ? 'true' : 'false');
    // notify any listeners so UI can update immediately
    window.dispatchEvent(new CustomEvent('openToWorkChanged', { detail: value }));
  } catch (err) {
    console.warn('localStorage unavailable', err);
  }
};

export const onOpenToWorkChange = (cb: (value: boolean) => void) => {
  const handler = (e: Event) => {
    const custom = e as CustomEvent<boolean>;
    cb(Boolean(custom.detail));
  };
  window.addEventListener('openToWorkChanged', handler as EventListener);
  return () => window.removeEventListener('openToWorkChanged', handler as EventListener);
};

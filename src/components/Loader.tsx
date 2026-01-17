// src/components/Loader.jsx
const Loader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div className="spinner"></div> {/* Add CSS for a spinner later */}
    <p>Waking up the server... This might take 30 seconds.</p>
  </div>
);

export default Loader;
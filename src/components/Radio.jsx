export function Radio({ label, name, checked, onChange }) {
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center horizontally
          gap: '10px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease',
        }}
      >
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          style={{
            appearance: 'none',
            width: '18px',
            marginTop: '20px',
            height: '18px',
            border: '3px solid #000',
            boxShadow: '3px 3px 0px #000',
            borderRadius: '50%',
            outline: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backgroundColor: checked ? '#FFD700' : 'transparent',
          }}
        />
        <span style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
      </label>
    );
}
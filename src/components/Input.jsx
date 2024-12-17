export function Input({ placeholder, value = '', onChange, type, name, className }) {
    return (
      <input
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        name={name}
        className={className}
        onChange={onChange}
        style={{
          border: '3px solid #000',
          boxShadow: '5px 5px 0px #000',
          padding: '12px 16px',
          borderRadius: '8px',
          marginTop: '30px',
          outline: 'none',
          fontSize: '16px',
          fontWeight: '400',
          transition: 'all 0.3s ease',
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = '3px 3px 0px #000';
          e.target.style.transform = 'translate(2px, 2px)';
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = '5px 5px 0px #000';
          e.target.style.transform = 'translate(0px, 0px)';
        }}
      />
    );
  }
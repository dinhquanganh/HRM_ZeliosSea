const Textarea = ({
  label = '',
  rows = 10,
  className,
  disabled = false,
  readOnly = false,
  value = '',
  placeholder = '',
  onChange
}) => {
  return (
    <div className='w-full'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-neutral-300'
      >
        {label}
      </label>
      <textarea
        name={label}
        disabled={disabled}
        readOnly={readOnly}
        className={`textarea-default ${className}`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Textarea

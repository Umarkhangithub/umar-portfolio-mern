import React from 'react'

const InputField =  ({ label, name, type = "text", value, onChange, icon: Icon, placeholder }) => {
  return (
        <div className="relative">
          <label className="block text-sm font-semibold text-[#BDC3C7] mb-2">{label}</label>
          <div className="relative">
            {Icon && <Icon className="absolute left-3 top-3 text-[#BDC3C7] w-5 h-5" />}
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7]  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-gray-400"
              required
            />
          </div>
        </div>
  )
}

export default InputField

import React from "react"
import styles from '../styles/Button.module.scss'

export const Button: React.FC<any> = ({children, className, ...props}) => (
  <button {...props} className={(className ? className+' ' : '') + styles.Button  }>
    {children}
  </button>
  );

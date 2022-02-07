import React from "react"
import styles from '../styles/Button.module.scss'

export const Button: React.FC<any> = ({children, style, ...props}) => {
  return <button {...props} className={styles.Button} style={style}>{children}</button>;
}

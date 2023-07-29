import { Fragment, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import copyLogo from './assets/images/icon-copy.svg'
import checked from './assets/images/icon-check.svg'
import rightArrow from './assets/images/icon-arrow-right.svg'
import copyHover from './assets/images/hover_copy.svg'

import classes from './App.module.scss'

const passwordItems = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '1234567890',
  symbols: '!@#$&*'
}

function App () {
  const [password, setPassword] = useState('')
  const [passwordCopyed, setPasswordCopyed] = useState('')

  const [characterLength, setCharacterLength] = useState('0')

  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  })

  const [passwordStrength, setPasswordStrength] = useState('')

  const generatedPasswordCopyHandler = function () {
    navigator.clipboard.writeText(password).then(() => {
      setPasswordCopyed('COPIED')
      setTimeout(() => setPasswordCopyed(''), 3000)
    })
  }

  const passwordStrengthHandler = function () {
    const uppercaseCheck = /[A-Z]/g.test(password)
    const lowercaseCheck = /[a-z]/g.test(password)
    const numberCheck = /[0-9]/g.test(password)
    const symbolCheck = /[!@#$&*]/g.test(password)

    // console.log(password)
    // console.log(uppercaseCheck, lowercaseCheck, numberCheck, symbolCheck)

    if (
      characterLength > 10 &&
      uppercaseCheck &&
      lowercaseCheck &&
      numberCheck &&
      symbolCheck
    ) {
      setPasswordStrength('STRONG')
    } else if (
      characterLength > 7 &&
      uppercaseCheck &&
      lowercaseCheck &&
      numberCheck &&
      symbolCheck
    ) {
      setPasswordStrength('MEDIUM')
    } else if (characterLength > 4) {
      setPasswordStrength('WEAK')
    } else {
      setPasswordStrength('TOO WEAK!')
    }

    // ერთით აგვიანებს რენდერს
  }

  const passwordGenerateHandler = function () {
    let pass = ''
    const randomizer = function (symbolType) {
      return Math.trunc(Math.random() * passwordItems[symbolType].length)
    }

    for (let l = 1; l <= characterLength; l++) {
      if (checkBoxIsChecked.uppercase) {
        const random = randomizer('uppercase')
        pass += passwordItems.uppercase[random]
        // if (pass.length === Number(characterLength)) return setPassword(pass)
      }
      if (checkBoxIsChecked.lowercase) {
        const random = randomizer('lowercase')
        pass += passwordItems.lowercase[random]
        // if (pass.length === Number(characterLength)) return setPassword(pass)
      }
      if (checkBoxIsChecked.numbers) {
        const random = randomizer('numbers')
        pass += passwordItems.numbers[random]
        // if (pass.length === Number(characterLength)) return setPassword(pass)
      }
      if (checkBoxIsChecked.symbols) {
        const random = randomizer('symbols')
        pass += passwordItems.symbols[random]
        // if (pass.length === Number(characterLength)) return setPassword(pass)
      }
    }

    if (pass.length > characterLength) {
      const sliceStart = Math.trunc(Math.random() * characterLength / 2)

      const getSum = function (a, b) {
        if (b === 0) {
          return a
        } else {
          return getSum(a ^ b, (a & b) << 1)
        }
      }
      setPassword(
        (pass.slice(sliceStart,
          `${getSum(sliceStart, Number(characterLength))}`)))
    } else {
      setPassword(pass)
    }
  }

  const passGenerator = function () {
    if (characterLength > 0) {
      passwordGenerateHandler()
      passwordStrengthHandler()
    }

  }

  // console.log(password)

  return (
    <div className={classes.app}>
      <h1 className={classes.header}>Password Generator</h1>
      <div className={classes['generated-password']}>
        <p
          data-placeholder="P4$5W0rD!"
          //  contenteditable
        >
          {password}
        </p>
        <span>{passwordCopyed}</span>
        <button type="" onClick={generatedPasswordCopyHandler}>
          {/* <img src={copyLogo} alt="" /> */}
          <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
              fill="#A4FFAF"
            />
          </svg>
        </button>
      </div>
      <div className={classes['password-generator']}>
        <div className={classes['character-length']}>
          <label htmlFor="password-length">Character Length</label>
          <span>{characterLength}</span>
        </div>
        <input
          className={classes['character-length']}
          value={characterLength}
          onChange={(e) => setCharacterLength(e.target.value)}
          type="range"
          name="password-length"
          id="password-length"
          min="0"
          max="20"
        />

        <div className={classes['character-types']}>
          <div>
            {/* <input type="checkbox" name="upperCase" id="upperCase" /> */}
            <div
              className={checkBoxIsChecked.uppercase && classes['no-border']}
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    uppercase: !checkBoxIsChecked.uppercase
                  }
                })
              }
            >
              {checkBoxIsChecked.uppercase && <img src={checked} alt=""/>}
            </div>
            <label htmlFor="upperCase">Include Uppercase Letters</label>
          </div>
          <div>
            <div
              className={checkBoxIsChecked.lowercase && classes['no-border']}
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    lowercase: !checkBoxIsChecked.lowercase
                  }
                })
              }
            >
              {checkBoxIsChecked.lowercase && <img src={checked} alt=""/>}
            </div>
            <label htmlFor="lowerCase">Include Lowercase Letters</label>
          </div>
          <div>
            <div
              className={checkBoxIsChecked.numbers && classes['no-border']}
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    numbers: !checkBoxIsChecked.numbers
                  }
                })
              }
            >
              {checkBoxIsChecked.numbers && <img src={checked} alt=""/>}
            </div>
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div>
            <div
              className={checkBoxIsChecked.symbols && classes['no-border']}
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    symbols: !checkBoxIsChecked.symbols
                  }
                })
              }
            >
              {checkBoxIsChecked.symbols && <img src={checked} alt=""/>}
            </div>
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <div className={classes['password-strength']}>
          <span>STRENGTH</span>
          <div className={classes['password-strength-indicators']}>
            <span>{passwordStrength}</span>
            <div
              className={
                passwordStrength === 'TOO WEAK!'
                  ? classes.red
                  : passwordStrength === 'WEAK'
                    ? classes.orange
                    : passwordStrength === 'MEDIUM'
                      ? classes.yellow
                      : passwordStrength === 'STRONG'
                        ? classes.green
                        : ''
              }
            ></div>
            <div
              className={
                passwordStrength === 'WEAK'
                  ? classes.orange
                  : passwordStrength === 'MEDIUM'
                    ? classes.yellow
                    : passwordStrength === 'STRONG'
                      ? classes.green
                      : ''
              }
            ></div>
            <div
              className={
                passwordStrength === 'MEDIUM'
                  ? classes.yellow
                  : passwordStrength === 'STRONG'
                    ? classes.green
                    : ''
              }
            ></div>
            <div
              className={passwordStrength === 'STRONG' ? classes.green : ''}
            ></div>
          </div>
        </div>
        <button onClick={passGenerator}>
          GENERATE
          {/* <img src={rightArrow} alt="" /> */}
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#24232C"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { MdStyle, MdPerson, MdColorLens } from 'react-icons/md'
import { FaHatCowboy, FaSeedling, FaTshirt, FaRegEye } from 'react-icons/fa'
import { IoMdGlasses } from 'react-icons/io'
import { AiFillPicture } from 'react-icons/ai'
import { GiMustache, GiEyelashes, GiLips } from 'react-icons/gi'
import { Button, Input, Select} from 'react-figma-plugin-ds'
import ReactTooltip from 'react-tooltip'
import "react-figma-plugin-ds/figma-plugin-ds.css";
import './App.css'
import data from './avataaars.json'

interface iCustomisation {
  name: string
  placeholder: string
  icon: string
  options: any
  dependantOn?: string
  probability?: string
}

const customisations: iCustomisation[] = data.avataaars;

customisations.map(customisation => {
  const optionSet: { value: string; label: string; }[] = [];
  for (let index in customisation.options) { optionSet.push({value: customisation.options[index], label: customisation.options[index]})}
  customisation.options = optionSet
})

type keysToIconsMap = {[key: string]: IconType}
const keysToIconsMap = {
  MdStyle: MdStyle,
  MdPerson: MdPerson,
  MdColorLens: MdColorLens,
  FaHatCowboy: FaHatCowboy,
  FaTshirt: FaTshirt,
  FaRegEye: FaRegEye,
  IoMdGlasses: IoMdGlasses,
  AiFillPicture: AiFillPicture,
  GiMustache:GiMustache,
  GiEyelashes:GiEyelashes,
  GiLips:GiLips
}

interface iSelectedOptions {
  [key: string]: string | undefined | number
}

function getRandomSeed():number {
  return Math.floor(Math.random() * (10000 - 1000) + 1000)
}

function getCustomisation(name: string):iCustomisation{
  return customisations.filter(customisation => {
    return customisation.name === name
  })[0]
}

function getAvataaar(options: any): void {
  if(options.seed === undefined) {options.seed = getRandomSeed()}
  let uri:string = `https://avatars.dicebear.com/api/avataaars/:${options.seed}.svg?`
  for (let [key, value] of Object.entries(options)) {
    const customisation = getCustomisation(key);
    if( value !== "random" && value !== undefined && key !== "seed" ) {
      if(customisation.probability) {
        uri+=`&${customisation.probability}=100`
      }
      uri+=`&${key}=${value}`
    }
  }
  fetch(uri)
  .then(svg => svg.text())
  .then(svg => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: { avataaar: svg , options: options} }, '*')
    }
  })
}

function App() {
  const [selectedOptions, setSelectedOptions] = useState<iSelectedOptions>({
    seed: getRandomSeed()
  });

  const updateSelectedOption = (key: string, value: any) => {
    let localOptions = selectedOptions
    localOptions[key] = value
    setSelectedOptions(localOptions)
  }

  useEffect(() => {
    window.addEventListener("message", (msg: MessageEvent) => {
      setSelectedOptions(msg.data.pluginMessage.options)
      if(msg.data.pluginMessage.type === "randomise"){
        getAvataaar(msg.data.pluginMessage.options)
      }
    })
  }, [])

  return (
    <div className='App'>
      <div className="row">
        <FaSeedling data-tip="Random Seed" />
        <Input
          className="full-width"
          defaultValue={decodeURI(selectedOptions.seed ? selectedOptions.seed.toString() : "")}
          onChange={(v) => updateSelectedOption("seed", encodeURI(v))}
          placeholder="Random Seed"
        />
      </div>
      {customisations.map((dropdown,i) => {
        const Icon = keysToIconsMap[dropdown.icon as keyof typeof keysToIconsMap]
        return (
          <>
            <div className="row">
              <Icon  data-tip={dropdown.placeholder} />
              <Select 
                defaultValue={selectedOptions[dropdown.name]}
                onChange={e => updateSelectedOption(dropdown.name, e.value)}
                options={dropdown.options}
                placeholder={dropdown.placeholder}
              />
            </div>
          </>
        )
      })}
      <div className='push'></div>
      <div className='fixed-bottom'>
        <Button
          className="full-width"
          onClick={() => getAvataaar(selectedOptions)}
        >Generate Avataaar</Button>
      </div>
      <ReactTooltip place="left" />
    </div>
  )
}

export default App
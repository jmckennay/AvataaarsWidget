import React, { useEffect, useState } from 'react'
import { MdStyle } from 'react-icons/md'
import { FaHatCowboy, FaSeedling } from 'react-icons/fa'
import { IoMdGlasses } from 'react-icons/io'
import { Disclosure, Tip, Title, Checkbox, Button, Label, Input, Select, Icon} from 'react-figma-plugin-ds'
import "react-figma-plugin-ds/figma-plugin-ds.css";
import './App.css'

const options = {
  style: ["transparent","circle"],
  top: ["longHair", "shortHair", "eyepatch", "hat", "hijab", "turban", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "fro", "froAndBand", "miaWallace", "longButNotTooLong", "shavedSides", "straight01", "straight02", "straightAndStrand", "dreads01", "dreads02", "frizzle", "shaggy", "shaggyMullet", "shortCurly", "shortFlat", "shortRound", "shortWaved", "sides", "theCaesar", "theCaesarAndSidePart", "winterHat01", "winterHat02", "winterHat03", "winterHat04"],
  accessories: ["kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"]
}

function getOptions(options: string[]) {
  const optionSet: { value: string; label: string; }[] = [{value: "random", label: "random"}];
  options.map((v: any) => {
    optionSet.push({value: v, label: v})
  })
  return optionSet
}

function getAvataar(selectedOptions: any, randomSeed: number) {
  console.log(selectedOptions)
  let uri:string = `https://avatars.dicebear.com/api/avataaars/:${randomSeed}.svg?`
  for (const [key, value] of Object.entries(selectedOptions)) {
    if( value !== "random" && value !== undefined ) {
      uri+=`&${key}=${value}`
    }
  }
  fetch(uri)
  .then(res => res.text())
  .then(res => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: res }, '*')
    }
  })
}

interface iSelectedOptions {
  [key: string]: string | undefined
}

function App() {
  const [selectedOptions, setSelectedOptions] = useState<iSelectedOptions>({
    style: "circle",
    top: undefined,
    accessories: undefined
  });
  const [randomSeed, setRandomSeed] = useState(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000))

  const updateSelectedOption = (key: string, value: any) => {
    selectedOptions[key] = value
  }

  useEffect(() => {
  }, [])

  return (
    <div className='App'>
      <Label>{selectedOptions.style}</Label>
      <div className="row">
      <FaSeedling />
      <Input
        className="full-width"
        defaultValue={randomSeed}
        onChange={(v) => setRandomSeed(Number.parseFloat(v))}
        placeholder="Random Seed"
      />
      </div>
      <div className="row">
        <MdStyle />
        <Select
          defaultValue={selectedOptions.style}
          onChange={e => updateSelectedOption("style", e.value)}
          onExpand={function _(){}}
          options={getOptions(options.style)}
          placeholder="Background Style"
        />
      </div>
      <div className="row">
        <FaHatCowboy />
        <Select
          defaultValue={selectedOptions.top}
          onChange={e => updateSelectedOption("top", e.value)}
          onExpand={function _(){}}
          options={getOptions(options.top)}
          placeholder="Hats and Hair"
        />
      </div>
      <div className="row">
        <IoMdGlasses title="Accessories"/>
        <Select
          defaultValue={selectedOptions.accessories}
          onChange={e => updateSelectedOption("accessories", e.value)}
          onExpand={function _(){}}
          options={getOptions(options.accessories)}
          placeholder="Glasses"
        />
      </div>
      <div className='spacer'></div>
      <Button
      className="full-width"
      onClick={() => getAvataar(selectedOptions, randomSeed)}
      >Generate Avataaar</Button>

    </div>
  )
}

export default App
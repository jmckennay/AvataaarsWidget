import React, { useEffect, useState } from 'react'
import { MdStyle, MdPerson } from 'react-icons/md'
import { FaHatCowboy, FaSeedling, FaTshirt, FaRegEye } from 'react-icons/fa'
import { IoMdGlasses } from 'react-icons/io'
import { GiMustache, GiEyelashes, GiLips } from 'react-icons/gi'
import { Disclosure, Tip, Title, Checkbox, Button, Label, Input, Select, Icon} from 'react-figma-plugin-ds'
import "react-figma-plugin-ds/figma-plugin-ds.css";
import './App.css'

const options = {
  style: ["transparent","circle"],
  top: ["longHair", "shortHair", "eyepatch", "hat", "hijab", "turban", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "fro", "froAndBand", "miaWallace", "longButNotTooLong", "shavedSides", "straight01", "straight02", "straightAndStrand", "dreads01", "dreads02", "frizzle", "shaggy", "shaggyMullet", "shortCurly", "shortFlat", "shortRound", "shortWaved", "sides", "theCaesar", "theCaesarAndSidePart", "winterHat01", "winterHat02", "winterHat03", "winterHat04"],
  accessories: ["kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"],
  facialHair: ["medium", "beardMedium", "light", "beardLight", "majestic", "beardMajestic", "fancy", "moustaceFancy", "magnum", "moustacheMagnum"],
  clothes: ["blazer", "blazerAndShirt", "blazerAndSweater", "sweater", "collarAndSweater", "shirt", "graphicShirt", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck", "hoodie", "overall"],
  eyes: ["close", "closed", "cry", "default", "dizzy", "xDizzy", "roll", "eyeRoll", "happy", "hearts", "side", "squint", "surprised", "wink", "winkWacky"],
  eyebrow: ["angry", "angryNatural", "default", "defaultNatural", "flat", "flatNatural", "raised", "raisedExcited", "raisedExcitedNatural", "sad", "sadConcerned", "sadConcernedNatural", "unibrow", "unibrowNatural", "up", "upDown", "upDownNatural", "frown", "frownNatural"],
  mouth: ["concerned", "default", "disbelief", "eating", "grimace", "sad", "scream", "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"],
  skin: ["tanned", "yellow", "pale", "light", "brown", "darkBrown", "black"],
}

const dropdowns = [
  {title: "style", placeholder: "Style", icon: MdStyle, options: options.style},
  {title: "top", placeholder:"Hats or hair", icon: FaHatCowboy, options: options.top},
  {title: "accessories", placeholder:"Glasses", icon: IoMdGlasses, options: options.accessories},
  {title: "facialHair", placeholder:"Beards", icon: GiMustache, options: options.facialHair},
  {title: "clothes", placeholder:"Clothes", icon: FaTshirt, options: options.clothes},
  {title: "eyes", placeholder:"Eyes", icon: FaRegEye, options: options.eyes},
  {title: "eyebrow", placeholder:"Eyebrows", icon: GiEyelashes, options: options.eyebrow},
  {title: "mouth", placeholder:"Mouth", icon: GiLips, options: options.mouth},
  {title: "skin", placeholder:"Skin Colour", icon: MdPerson, options: options.skin},
]

function getOptions(options: string[]) {
  const optionSet: { value: string; label: string; }[] = [{value: "random", label: "random"}];
  options.map((v: any) => {
    optionSet.push({value: v, label: v})
  })
  return optionSet
}

function getAvataar(o: any) {
  let uri:string = `https://avatars.dicebear.com/api/avataaars/:${o.seed}.svg?`
  for (const [key, value] of Object.entries(o)) {
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
  [key: string]: string | undefined | number
}

function App() {
  const [selectedOptions, setSelectedOptions] = useState<iSelectedOptions>({
    seed: 1,
    style: "circle",
    top: undefined,
    accessories: undefined,
    facialHair: undefined,
    clothes: undefined
  });

  const updateSelectedOption = (key: string, value: any) => {
    selectedOptions[key] = value
    console.log(selectedOptions)
  }

  useEffect(() => {
  }, [])

  return (
    <div className='App'>
      <div className="row">
        <FaSeedling />
        <Input
          className="full-width"
          defaultValue={selectedOptions.seed}
          onChange={(v) => updateSelectedOption("seed", Number.parseFloat(v))}
          placeholder="Random Seed"
        />
      </div>
      {dropdowns.map((dropdown,i) => {
        const Icon = dropdown.icon;
        return (
          <>
            <div className="row">
              <Icon />
              <Select 
                defaultValue={selectedOptions[dropdown.title]}
                onChange={e => updateSelectedOption(dropdown.title, e.value)}
                onExpand={function _(){}}
                options={getOptions(dropdown.options)}
                placeholder={dropdown.placeholder}
              />
            </div>
          </>
        )
      })}
      <div className='spacer'></div>
      <Button
        className="full-width"
        onClick={() => getAvataar(selectedOptions)}
      >Generate Avataaar</Button>

    </div>
  )
}

export default App
import React, { useEffect, useState } from 'react'
import { MdStyle, MdPerson, MdColorLens } from 'react-icons/md'
import { FaHatCowboy, FaSeedling, FaTshirt, FaRegEye } from 'react-icons/fa'
import { IoMdGlasses } from 'react-icons/io'
import { AiFillPicture } from 'react-icons/ai'
import { GiMustache, GiEyelashes, GiLips } from 'react-icons/gi'
import { Disclosure, Tip, Title, Checkbox, Button, Label, Input, Select, Icon} from 'react-figma-plugin-ds'
import "react-figma-plugin-ds/figma-plugin-ds.css";
import './App.css'

interface iDropdown {
  title: string
  placeholder: string
  icon: any
  options: any
  dependantOn?: string
}

interface iSelectedOptions {
  [key: string]: string | undefined | number
}

enum styles { transparent, circle }
enum tops { longHair, shortHair, eyepatch, hat, hijab, turban, bigHair, bob, bun, curly, curvy, dreads, frida, fro, froAndBand, miaWallace, longButNotTooLong, shavedSides, straight01, straight02, straightAndStrand, dreads01, dreads02, frizzle, shaggy, shaggyMullet, shortCurly, shortFlat, shortRound, shortWaved, sides, theCaesar, theCaesarAndSidePart, winterHat01, winterHat02, winterHat03, winterHat04 }
enum hatColors { black, blue, blue01, blue02, blue03, gray, gray01, gray02, heather, pastel, pastelBlue, pastelGreen, pastelOrange, pastelRed, pastelYellow, pink, red, white }
enum hairColors { auburn, black, blonde, blondeGolden, brown, brownDark, pastel, pastelPink, platinum, red, gray, silverGray }
enum accessories { kurt, prescription01, prescription02, round, sunglasses, wayfarers }
enum accessoryColors { black, blue, blue01, blue02, blue03, gray, gray01, gray02, heather, pastel, pastelBlue, pastelGreen, pastelOrange, pastelRed, pastelYellow, pink, red, white }
enum facialHairs { medium, beardMedium, light, beardLight, majestic, beardMajestic, fancy, moustaceFancy, magnum, moustacheMagnum }
enum facialHairColors { auburn, black, blonde, blondeGolden, brown, brownDark, pastel, pastelPink, platinum, red, gray, silverGray }
enum clothes { blazer, blazerAndShirt, blazerAndSweater, sweater, collarAndSweater, shirt, graphicShirt, shirtCrewNeck, shirtScoopNeck, shirtVNeck, hoodie, overall }
enum clothesColors { black, blue, blue01, blue02, blue03, gray, gray01, gray02, heather, pastel, pastelBlue, pastelGreen, pastelOrange, pastelRed, pastelYellow, pink, red, white }
enum eyes { close, closed, cry, default, dizzy, xDizzy, roll, eyeRoll, happy, hearts, side, squint, surprised, wink, winkWacky }
enum eyebrows { angry, angryNatural, default, defaultNatural, flat, flatNatural, raised, raisedExcited, raisedExcitedNatural, sad, sadConcerned, sadConcernedNatural, unibrow, unibrowNatural, up, upDown, upDownNatural, frown, frownNatural }
enum mouths { concerned, default, disbelief, eating, grimace, sad, scream, screamOpen, serious, smile, tongue, twinkle, vomit }
enum skinTones { tanned, yellow, pale, light, brown, darkBrown, black }
enum graphics { skullOutline, skull, resist, pizza, hola, diamond, deer, cumbia, bear, bat }

const dropdowns: iDropdown[] = [
  {title: "style", placeholder: "Style", icon: MdStyle, options: styles},
  {title: "top", placeholder:"Hats and hair", icon: FaHatCowboy, options: tops},
  {title: "hatColor", placeholder:"Hat Color", icon: MdColorLens, options: hatColors, dependantOn: "top"},
  {title: "hairColor", placeholder:"Hair Color", icon: MdColorLens, options: hairColors, dependantOn: "top"},
  {title: "accessories", placeholder:"Glasses", icon: IoMdGlasses, options: accessories},
  {title: "accessoriesColor", placeholder:"Glasses Color", icon: MdColorLens, options: accessoryColors},
  {title: "facialHair", placeholder:"Beards", icon: GiMustache, options: facialHairs},
  {title: "facialHairColor", placeholder:"Beard Color", icon: MdColorLens, options: facialHairColors},
  {title: "clothes", placeholder:"Clothes", icon: FaTshirt, options: clothes},
  {title: "clothesColor", placeholder:"Clothes Color", icon: MdColorLens, options: clothesColors},
  {title: "eyes", placeholder:"Eyes", icon: FaRegEye, options: eyes},
  {title: "eyebrow", placeholder:"Eyebrows", icon: GiEyelashes, options: eyebrows},
  {title: "mouth", placeholder:"Mouth", icon: GiLips, options: mouths},
  {title: "skin", placeholder:"Skin Colour", icon: MdPerson, options: skinTones},
  {title: "clotheGraphics", placeholder:"Graphics", icon: AiFillPicture, options: graphics}
]

function getOptions(options: any) {
  const optionSet: { value: string; label: string; }[] = [{value: "random", label: "random"}];
  for (let item in options) {isNaN(Number(item)) ? optionSet.push({value: item, label: item}) : false }
  return optionSet
}

function getRandomSeed():number {
  return Math.floor(Math.random() * (10000 - 1000) + 1000)
}

function getAvataar(options: any) {
  let uri:string = `https://avatars.dicebear.com/api/avataaars/:${options.seed}.svg?`
  for (const [key, value] of Object.entries(options)) {
    if( value !== "random" && value !== undefined && key !== "seed" ) {
      uri+=`&${key}=${value}`
    }
  }
  fetch(uri)
  .then(res => res.text())
  .then(res => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: { avataaar: res, options: options} }, '*')
    }
  })
}

const setAll = (obj: any, val: any) => Object.keys(obj).forEach(k => obj[k] = val);

function App() {
  const [selectedOptions, setSelectedOptions] = useState<iSelectedOptions>({
    seed: undefined,
    style: "circle",
  });

  const updateSelectedOption = (key: string, value: any) => {
    let localOptions = selectedOptions
    localOptions[key] = value
    setSelectedOptions(localOptions)
  }

  useEffect(() => {
    window.addEventListener("message", (msg: MessageEvent) => {
      setSelectedOptions(msg.data.pluginMessage.options)
      if(selectedOptions.seed === undefined){
        updateSelectedOption("seed", getRandomSeed())
      }
      if(msg.data.pluginMessage.type === "randomise"){
        getAvataar(selectedOptions)
      }
    })
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
      <div className='push'></div>
      <div className='fixed-bottom'>
        <Button
          className="full-width"
          onClick={() => getAvataar(selectedOptions)}
        >Generate Avataaar</Button>
      </div>
    </div>
  )
}

export default App
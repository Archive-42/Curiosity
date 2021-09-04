import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getEstablishedTagIds,
  getApplicableTagIds,
  filterTraitsByTags,
  rollForTrait
} from './utils'

// MY COMPONENTS
import ResultDisplay from './ResultDisplay'
import TraitField from './TraitField'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// ACTIONS
import { setAllContent } from '../../store/genActions/traitActions'
import { updateSetting, } from '../../store/genActions/settingActions'
import { setGenerator } from '../../store/genActions/genActions'

// const basePath = process.env.NODE_ENV === "development" ? `http://localhost:4000` : process.env.NPSEED_BASE_PATH
const basePath = process.env.NODE_ENV === "development" ? `http://localhost:4000` : "https://npseed.herokuapp.com"

// *****************************************************************************

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }


// export default function SimpleTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">

//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </div>
//   );
// }


export default function Generator({ auth, setAuth }) {
  const dispatch = useDispatch()

  const categories = useSelector(state => state.charGen.categories)
  const traitTypes = useSelector(state => state.charGen.traitTypes)
  const traits = useSelector(state => state.charGen.traits)
  const tagTypes = useSelector(state => state.charGen.tagTypes)
  const tagTypeChances = useSelector(state => state.charGen.tagTypeChances)
  const settings = useSelector(state => state.charGen.settings)
  const genSettings = useSelector(state => state.charGen.genSettings)
  const generator = useSelector(state => state.charGen.generator)

  useEffect(() => {
    // TODO Create action creator that does both simultaneously
    if (!Object.keys(categories).length) {
      (async () => {
        const resCat = await fetch(`${basePath}/categories/all`)
        const content = await resCat.json()
        dispatch(setAllContent(content))
      })()
    }
    if (!generator.id) {
      (async () => {
        const id = 2
        const resGen = await fetch(`${basePath}/generators/chances/${id}`)
        const { generator, tagTypeChances } = await resGen.json()
        console.log("generator", generator)
        dispatch(setGenerator(generator, tagTypeChances))
      })()
    }
  }, [])


  const handleSubmit = (ev) => {
    ev.preventDefault()
    Object.values(traitTypes).forEach(traitType => {
      if (!genSettings[traitType.traitType]) {
        const traitsOfType = Object.values(traits).filter(t => traitType.traitIds.includes(t.id))

        const estTagIds = getEstablishedTagIds(genSettings, traits)
        const appTagIds = getApplicableTagIds(traitType.tagTypeIds, tagTypes, estTagIds, tagTypeChances)
        const traitsWithTags = filterTraitsByTags(traitType.tagTypeIds, appTagIds, traitsOfType, tagTypes)
        let trait = rollForTrait(traitsWithTags)

        dispatch(updateSetting({ traitType: traitType.traitType, trait: trait.id }))
      }
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const res = await fetch(`${basePath}/characters/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    })
    const char = await res.json()
    const res2 = await fetch(`/api/characters/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)

    })
    // TODO Save character to npseed database, then on confirmation, use that info
    // to save character to main database
  }

  if (!Object.keys(categories)) return null

  return (
    <main>
      <h2>Customize Options</h2>

      {/* <button onClick={handleSave}>Save Character</button> */}
      <h3>How does this work?</h3>
      <p>Customize each option to suit your needs, and the randomizer will adjust the results for you. Certain traits will have a higher chance to be rolled than others based on if traits have matching 'tags'. For example, if you choose a girl's name, the generator will usually return 'girl' for the gender option, of if you choose a Korean name, 'Eastern'-associated traits will be more likely.</p>
      <p>Please note that though there is a <i>very high chance</i> for certain tags to get certain results, like girl names with a girl gender, no combination is completely impossible for the randomizer. It incorporates a small chance of rolling completely randomly without any other tags effecting it!</p>
      <p><b>Your options are:</b></p>
      <ul style={{ listStyle: "circle", marginLeft: "2rem" }}>
        <li>Hit 'Randomize'! This will randomize all 'undecided' traits for you at once. The results will be effected both by its own results as it decides each trait down the list, plus any traits you've already set, and the traits you set below <i>won't</i> randomize.</li>
        <li>Randomize individual traits with the 'randomize' button below the trait.</li>
        <li>Choose one of the options from the dropdown. The options you choose will effect the randomization results of the other traits.</li>
        <li>Type in your own custom option! This option will show in your final result sheet, but since it has no tags, it won't effect the result of any other traits.</li>
        <li>Mix and match the above options for a set-up that works for your needs!</li>
        <li><small>Future options coming soon(er or later): Choosing from multiple different 'chance' generators, choosing the tags directly for yourself, customizing and saving your own generator settings, saving your characters to your account, and more...</small></li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="spotlight" style={{ padding: "1rem 2rem" }}>
          <ResultDisplay handleSave={handleSave} />
        </div>


        {Object.values(categories).map(c => (
          <>
            <hr />
            <h3>Category: {c.category}</h3>
            {c.traitTypeIds.map(ttid => {
              return (<TraitField
                traitType={traitTypes[ttid]}
                traitsOfType={Object.values(traits).filter(t => traitTypes[ttid].traitIds.includes(t.id))}
                tagTypeIds={traitTypes[ttid].tagTypeIds}
              />)
            })}
          </>
        ))}

      </form>
    </main>
  )
}
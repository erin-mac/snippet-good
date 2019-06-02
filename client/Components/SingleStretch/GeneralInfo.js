import React from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import CategorySelect from '../StretchForm/CategorySelect'
import Slider from '@material-ui/lab/Slider'

import { GeneralInfoStyles as styles } from './styles'

const GeneralInfo = props => {
  const { attributes, handleChange } = props
  const { mode, title, categoryName, difficulty } = attributes

  const handleDifficultyChange = (event, value) =>
    handleChange({ target: { name: 'difficulty', value } })

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h6">Stretch Details</Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.row}>
            {/* Title input/display */}
            <div>
              <InputLabel shrink>Title</InputLabel>
              {mode === 'read' ? (
                <Typography variant="subtitle2">{title}</Typography>
              ) : (
                <TextField
                  name="title"
                  defaultValue={title}
                  margin="normal"
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Category select/display */}
            <div>
              <InputLabel shrink>Category</InputLabel>
              {mode === 'read' ? (
                <Typography variant="subtitle2">{categoryName}</Typography>
              ) : (
                <CategorySelect
                  attributes={attributes}
                  handleChange={handleChange}
                />
              )}
            </div>

            {/* Difficulty slider/display */}
            {mode === 'read' ? (
              <div>
                <InputLabel shrink>Difficulty</InputLabel>
                <Typography variant="subtitle2">{difficulty}</Typography>
              </div>
            ) : (
              <div>
                <InputLabel shrink>Difficulty: {difficulty}</InputLabel>
                <Slider
                  name="difficulty"
                  value={difficulty}
                  min={1}
                  max={5}
                  step={1}
                  onChange={handleDifficultyChange}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default GeneralInfo

import React, { useState } from 'react'

import { connect } from 'react-redux'
import {
  createCohortStretch,
  updateCohortStretchThunk
} from '../../store/cohort-stretches/actions'

import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import DateAndTimePicker from './DateAndTimePicker'
import CohortSelect from './CohortSelect'

const StretchScheduler = props => {
  const { attributes, open, onClose, mode } = props
  const { id } = attributes

  const [scheduledDate, setScheduledDate] = useState(new Date())
  const [selectedCohortId, setSelectedCohortId] = useState('')
  const [allowAnswersToBeRun, setAllowAnswersToBeRun] = useState(false)

  const handleCohortIdChange = event => setSelectedCohortId(event.target.value)

  const updateData = () => {
    if (mode === 'update') {
      return props.updateScheduledDate(id, { scheduledDate })
    } else {
      return props.scheduleStretch({
        status: 'scheduled',
        scheduledDate,
        allowAnswersToBeRun,
        stretchId: id,
        cohortId: selectedCohortId
      })
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateData().then(() => {
      onClose() // Close modal
      // Display a message saying 'Stretch scheduled successfully!'
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ ...styles.root, ...styles.center }}
      disableAutoFocus={true}
    >
      <Paper style={{ padding: '2em' }}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            {/* Date and time picker for scheduling the stretch */}
            <Grid item xs={12} style={styles.center}>
              <DateAndTimePicker
                name="scheduledDate"
                label="Scheduled Date"
                value={scheduledDate}
                handleChange={setScheduledDate}
              />
            </Grid>

            <Grid item xs={12} style={{ height: '20px' }} />
            {mode === 'create' && (
              <Grid item xs={12}>
                <CohortSelect
                  cohortId={selectedCohortId}
                  handleChange={handleCohortIdChange}
                />
              </Grid>
            )}

            <Grid item xs={12} style={{ height: '20px' }} />
            {mode === 'create' && (
              <Grid item xs={12} style={styles.center}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allowAnswersToBeRun}
                      onChange={({ target }) =>
                        setAllowAnswersToBeRun(target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Check this box if you want to allow students to run code while completing the stretch"
                />
              </Grid>
            )}

            <Grid item xs={12} style={{ height: '20px' }} />
            <Grid item xs={12} style={styles.center}>
              <Button type="submit" variant="contained" color="primary">
                Schedule
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  )
}

const styles = {
  root: {
    width: '100vw',
    height: '100vh'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = ({ cohorts }) => ({ cohorts })

const mapDispatchToProps = dispatch => ({
  scheduleStretch: data => dispatch(createCohortStretch(data)),
  updateScheduledDate: (cohortStretchId, updatedFields) =>
    dispatch(updateCohortStretchThunk(cohortStretchId, updatedFields))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StretchScheduler)

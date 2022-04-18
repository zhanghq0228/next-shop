import * as React from 'react'
// import styles from '../UI/ToimeLogPage.module.scss'
import styles from './ToimeLogPage.module.scss'
import { Icon } from 'office-ui-fabric-react'
import { useState } from 'react'

const Items = props => {
  const {
    item,
    weekday,
    projectChange,
    hoursChange,
    notesChange,
    removeProject,
    projects,
    accountNames,
    isSubmitted
  } = props

  const [selectedProject, setSelectedProject] = useState([])

  const projectHandler = (index, projectWeekday, value) => {
    projectChange(index, projectWeekday, value)
    // console.log(selectedProject.indexOf(value));
    // console.log(selectedProject);
    // if(selectedProject.indexOf(value) <= -1)
    // {
    //   setSelectedProject([...selectedProject, Number(value)]);
    // }
  }

  return item.map((iproject, projectIndex) => (
    <div className={styles.Details} key={projectIndex}>
      <div className={styles.Project}>
        <Icon
          className={styles.Remove}
          iconName="Cancel"
          title="Remove"
          onClick={() => removeProject(weekday, projectIndex)}
        ></Icon>
        <span onClick={() => removeProject(weekday, projectIndex)}></span>

        {/* <select className={item[projectIndex].projectBorderHighlight? styles.HightlightProjectDropDown : styles.ProjectDropDown} 
          onChange={(projectChangeProps) => projectChange(projectIndex, weekday, projectChangeProps.target.value)}  */}
        <select
          className={
            item[projectIndex].projectBorderHighlight
              ? styles.HightlightProjectDropDown
              : styles.ProjectDropDown
          }
          onChange={projectChangeProps =>
            projectHandler(
              projectIndex,
              weekday,
              projectChangeProps.target.value
            )
          }
          disabled={isSubmitted}
        >
          <option value={-1}>Please Select ...</option>
          {accountNames.map(account => (
            <optgroup label={account}>
              {projects.map(
                project =>
                  project.Account.Title === account &&
                  selectedProject.indexOf(project.ID) === -1 && (
                    <option
                      value={project.ID}
                      key={project.ID}
                      selected={item[projectIndex].projectId === project.ID}
                    >
                      {project.Title}
                    </option>
                  )
              )}
            </optgroup>
          ))}
        </select>
      </div>
      <div className={styles.Hrs}>
        <input
          value={item[projectIndex].hours}
          className={
            item[projectIndex].hoursBorderHightlight
              ? styles.HightlightHrsInput
              : styles.HrsInput
          }
          placeholder="hrs"
          type="number"
          onChange={hoursChangeProps =>
            hoursChange(projectIndex, weekday, hoursChangeProps.target.value)
          }
          readOnly={isSubmitted}
        ></input>
      </div>

      <div className={styles.Notes}>
        <input
          value={item[projectIndex].notes}
          className={styles.NotesInput}
          placeholder="Note"
          type="text"
          onChange={noteChangeProps =>
            notesChange(projectIndex, weekday, noteChangeProps.target.value)
          }
          readOnly={isSubmitted}
        ></input>
      </div>

      <div className={styles.Total}>
        <label className={styles.TotalDisplay}>
          {item[projectIndex].total.toString()}
        </label>
      </div>
    </div>
  ))
}

export default Items

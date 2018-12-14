import React, { Fragment } from "react";

export default (props: any) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <div className="form-group row">
            <label htmlFor="submittedDate" className="col-sm-4">
              Submitted Date
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="submittedDate"
                value={props.data.submittedDate}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group row">
            <label htmlFor="status" className="col-sm-4">
              Status
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="status"
                value={props.data.status}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group row">
            <label htmlFor="btnPillar" className="col-sm-4">
              BTN Framework Pillar
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                id="btnPillar"
                placeholder="Select One"
                value={props.data.framework}
                onChange={props.onFrameworkChange}
                name="framework1"
                disabled={props.data.status === "SUBMITTED"}
              >
                <option value="" hidden>
                  Select One
                </option>
                <option value="Experience">Experience</option>
                <option value="Insight">Insight</option>
                <option value="Innovate">Innovate</option>
                <option value="Accelerate">Accelerate</option>
                <option value="Assure">Assure</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="form-group row">
            <label htmlFor="nominationTitle" className="col-sm-4">
              Nomination Title
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="nominationTitle"
                autoComplete="off"
                value={props.data.nominationTitle}
                onChange={props.onNominationTitleChange}
                name="nominationTitle"
                readOnly={props.data.status === "SUBMITTED"}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group row">
            <label htmlFor="briefDescription" className="col-sm-2">
              Brief Description
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="briefDescription"
                rows={3}
                name="description"
                value={props.data.description}
                onChange={props.onDescriptionChange}
                readOnly={props.data.status === "SUBMITTED"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group row">
            <label htmlFor="idea" className="col-sm-4">
              Upload Idea
            </label>
            <div className="col-sm-8">
              <input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
                className="form-control-file"
                id="idea"
                name="ideaDocFile"
                ref={props.fileRef}
                disabled={props.data.status === "SUBMITTED"}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group row col-sm-4">
            <a href="/api/template">Download</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

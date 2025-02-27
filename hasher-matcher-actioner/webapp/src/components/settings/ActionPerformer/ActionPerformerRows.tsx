/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
 */

import {IonIcon} from '@ionic/react';
import {checkmark, trashBin, pencil, close} from 'ionicons/icons';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ActionPerformer} from '../../../pages/settings/ActionPerformerSettingsTab';
import ActionPerformerColumns from './ActionPerformerColumns';

type ActionPerformerRowsProps = {
  action: ActionPerformer;
  saveAction: (newAction: ActionPerformer) => void;
  deleteAction: (oldAction: ActionPerformer) => void;
  canNotDeleteOrUpdateName: boolean;
};

export default function ActionPerformerRows({
  action,
  saveAction,
  deleteAction,
  canNotDeleteOrUpdateName,
}: ActionPerformerRowsProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [showDeleteActionConfirmation, setShowDeleteActionConfirmation] =
    useState(false);
  const [showUpdateActionConfirmation, setShowUpdateActionConfirmation] =
    useState(false);
  const newAction = {...action};
  const [updatedAction, setUpdatedAction] = useState(newAction);

  const resetForm = () => {
    setUpdatedAction(action);
  };

  return (
    <>
      <tr hidden={editing}>
        <td>
          <Button
            className="mb-2 table-action-button"
            onClick={() => setEditing(true)}>
            <IonIcon icon={pencil} size="large" />
          </Button>
          <br />
          <Button
            variant="secondary"
            className="table-action-button"
            disabled={canNotDeleteOrUpdateName}
            onClick={() => setShowDeleteActionConfirmation(true)}>
            <IonIcon icon={trashBin} size="large" color="white" />
          </Button>
          <br />
          <Modal
            show={showDeleteActionConfirmation}
            onHide={() => setShowDeleteActionConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Action Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Please confirm you want to delete the action named{' '}
                <strong>{action.name}</strong>.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteActionConfirmation(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteAction(action);
                  setShowDeleteActionConfirmation(false);
                }}>
                Yes, Delete This Action
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
        <ActionPerformerColumns
          action={updatedAction}
          editing={false}
          updateAction={setUpdatedAction}
          canNotDeleteOrUpdateName={canNotDeleteOrUpdateName}
        />
      </tr>
      <tr hidden={!editing}>
        <td>
          <Button
            variant="outline-primary"
            className="mb-2 table-action-button"
            onClick={() => {
              setShowUpdateActionConfirmation(true);
            }}>
            <IonIcon icon={checkmark} size="large" color="white" />
          </Button>
          <br />
          <Button
            variant="outline-secondary"
            className="table-action-button"
            onClick={() => {
              resetForm();
              setEditing(false);
            }}>
            <IonIcon icon={close} size="large" />
          </Button>
          <Modal
            show={showUpdateActionConfirmation}
            onHide={() => setShowUpdateActionConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Action Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Please confirm you want to update the action named{' '}
                <strong>{action.name}</strong>.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowUpdateActionConfirmation(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setEditing(false);
                  saveAction(updatedAction);
                  setShowUpdateActionConfirmation(false);
                }}>
                Yes, Update This Action
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
        <ActionPerformerColumns
          action={updatedAction}
          editing
          updateAction={setUpdatedAction}
          canNotDeleteOrUpdateName={canNotDeleteOrUpdateName}
        />
      </tr>
    </>
  );
}

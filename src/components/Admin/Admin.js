import React, { useState } from 'react';
import AddBooks from '../AddBooks/AddBooks';
import ManageBooks from '../ManageBooks/ManageBooks';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Admin = () => {
    const [manage, setManage] = useState(true)

    return (
        <div className="row">
            <div className="col-md-3 text-center pt-5">
                <ButtonGroup className="text-center"
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >

                    <Button onClick={() => setManage(false)}>Add Book</Button>
                    <Button onClick={() => setManage(true)}>Manage Book</Button>
                </ButtonGroup>

            </div>
            <div className="col-md-9">
                {
                    manage ? <ManageBooks /> : <AddBooks />
                }
            </div>
        </div>
    );
};

export default Admin;
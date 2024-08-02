import React, { useState } from 'react';
import { Container, Grid, Drawer, Divider, List, ListItem } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import CloseIcon from '@mui/icons-material/Close';
import {dumpContainers} from "../data.js";

const drawerWidth = 240;

function App() {
    const [containers, setContainers] = useState(dumpContainers);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceContainer = containers[source.droppableId];
            const destContainer = containers[destination.droppableId];
            const sourceItems = [...sourceContainer.items];
            const destItems = [...destContainer.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setContainers({
                ...containers,
                [source.droppableId]: {
                    ...sourceContainer,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destContainer,
                    items: destItems,
                },
            });
        } else {
            const column = containers[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setContainers({
                ...containers,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    const containerKeys = Object.keys(containers);

    const handleWidgetCancel = (itemId) => {
        const sourceContainerId = Object.keys(containers).find(containerId =>
            containers[containerId].items.some(item => item.id === itemId)
        );
        if (!sourceContainerId) return;

        const sourceContainer = containers[sourceContainerId];
        const sourceItems = sourceContainer.items.filter(item => item.id !== itemId);
        const removedItem = sourceContainer.items.find(item => item.id === itemId);

        const fifthContainerId = Object.keys(containers)[5];
        const fifthContainer = containers[fifthContainerId];
        const destItems = [...fifthContainer.items, removedItem];

        setContainers({
            ...containers,
            [sourceContainerId]: {
                ...sourceContainer,
                items: sourceItems,
            },
            [fifthContainerId]: {
                ...fifthContainer,
                items: destItems,
            },
        });
    };

    const getDroppableDirection = (width, height) => (width > height ? 'horizontal' : 'vertical');

    const getFlexClassName = (width, height) => (width > height ? 'flex-row' : 'flex-col');

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {containerKeys.slice(0, 5).map((key, index) => (
                        <Grid item key={key}>
                            <Droppable droppableId={key} direction={getDroppableDirection(containers[key].width, containers[key].height)}>
                                {(provided, snapshot) => (
                                    <div
                                        className={`borders content-container ${getFlexClassName(containers[key].width, containers[key].height)}`}
                                        style={{ width: containers[key].width, height: containers[key].height }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {containers[key].items.map((item, index) => (
                                            <Widget key={item.id} item={item} index={index} dropped={true} onCancel={handleWidgetCancel}/>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                    ))}
                    <Grid item>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="permanent"
                            anchor="right"
                        >
                            <h2>MUI Drawer</h2>
                            <Divider />
                            <List>
                                <Droppable droppableId={containerKeys[5]}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {containers[containerKeys[5]].items.map((item, index) => (
                                                <ListItem key={item.id} disablePadding className={'mt-05'}>
                                                    <Widget item={item} index={index} onCancel={handleWidgetCancel}/>
                                                </ListItem>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </List>
                        </Drawer>
                    </Grid>
                </Grid>
            </Container>
        </DragDropContext>
    );
}

function Widget({ item, index, dropped, onCancel }) {
    const handleClick = () => {
        onCancel(item.id)
    }
    return (
        dropped ?
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    className={'green-widget'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <button onClick={handleClick} className={'cancel-button'}><CloseIcon/></button>
                    {item.content}
                </div>
            )}
        </Draggable> :
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    className={'widget'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.content}
                </div>
            )}
        </Draggable>

    );
}

export default App;
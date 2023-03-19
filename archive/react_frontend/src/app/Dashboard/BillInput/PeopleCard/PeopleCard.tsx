import * as React from 'react';
import {
    Card, CardBody,
    Stack, StackItem,
    Button,
} from '@patternfly/react-core';
import AddIcon from '@patternfly/react-icons/dist/esm/icons/user-plus-icon';
import { Person, PersonRow } from './PersonRow';
import { PayType } from './PayTypeSelect';

type PCProps = {
    onChange: (people: Person[], hasWarnings: boolean) => void
};
type PCState = {
    people: { [key: number]: { person: Person, JSX: React.ReactElement } },
    next_idx: number
};
export class PeopleCard extends React.Component<PCProps, PCState> {
    hasWarnings: (personArray: Person[]) => boolean;
    informParent: () => void;
    updatePerson: (id: number, person: Person) => void;
    addPerson: (_: any) => void;
    removePerson: (id: number) => void;
    renderPeople: () => React.ReactElement<any, string | React.JSXElementConstructor<any>>[];

    constructor(props: Readonly<PCProps>) {
        super(props);
        this.state = {
            people: {},
            next_idx: 0
        };


        this.hasWarnings = (personArray: Person[]) => {
            for (const p of personArray) {
                if (p.hasWarnings) {
                    return true;
                }
            }
            return false;
        };
        this.informParent = () => {
            let personArray: Person[] = [];
            for (const k in this.state.people) {
                personArray.push(this.state.people[k].person);
            }
            this.props.onChange(personArray, this.hasWarnings(personArray));
        }
        this.updatePerson = (id, person) => {
            let people = this.state.people;
            people[id].person = person;
            this.setState(
                { people: people },
                () => this.informParent()
            );
        }
        this.addPerson = (_: any) => {
            let people = this.state.people;
            let id = this.state.next_idx;
            people[id] = {
                person: new Person("", 0, PayType.exact, true),  // dummy, changes to match element on every change
                JSX: <PersonRow key={id} id={id} onRemoved={this.removePerson} onChanged={this.updatePerson} />
            };
            this.setState(
                { people: people, next_idx: this.state.next_idx + 1 },
                () => this.informParent()
            );
        };
        this.removePerson = (id: number) => {
            let people = this.state.people;
            delete people[id];
            this.setState(
                { people: people },
                () => this.informParent()
            );
        };

        this.renderPeople = () => {
            let personArray: React.ReactElement[] = [];
            for (const k in this.state.people) {
                personArray.push(this.state.people[k].JSX);
            }
            return personArray;
        };
    }

    componentDidMount() {
        this.addPerson(0);
    }

    render() {
        return (
            <Card isCompact={true}>
                <CardBody>
                    <Stack hasGutter={true}>
                        {this.renderPeople().map((p) => p)}
                        <StackItem>
                            <Button variant='secondary' aria-label={'add-person'} onClick={this.addPerson}>
                                <AddIcon size='md' />
                            </Button>
                        </StackItem>
                    </Stack>
                </CardBody>
            </Card>
        )
    }
}
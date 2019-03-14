
import React from 'react';


const Accordion = (props) => (
    <div className="accordion" id="accordionExample">
    <div className="card">
        <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <h5 className="mb-0">
            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Collapsible Group Item #1
            </button>
        </h5>
        </div>

        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div className="card-body">
            Anim pariatur cliche reprehenderit
        </div>
        </div>
    </div>
    <div className="card">
        <div className="card-header" id="headingTwo">
        <h5 className="mb-0">
            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Collapsible Group Item #2
            </button>
        </h5>
        </div>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
        <div className="card-body">
            enim eiusmod high life accusamus terry richardson 
        </div>
        </div>
    </div>
    <div className="card">
        <div className="card-header" id="headingThree">
        <h5 className="mb-0">
            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Collapsible Group Item #3
            </button>
        </h5>
        </div>
        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
            ad squid. 3 wolf moon officia aute
        </div>
        </div>
    </div>
    </div>
)

export default Accordion;
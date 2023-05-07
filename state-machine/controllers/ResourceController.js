const db = require(`../database/models/index.js`);
const fsm = require("./stateMachine");

/**
 * Class Resource Controller
 **/

class ResourceController {
  async get(req, res) {
    try {
      const data = await db.Resource.findAll({});
      res.json(data);
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error,
      });
    }
  }

  async create(req, res) {
    try {
      const data = await db.Resource.create(req.body);
      res.json({
        success: true,
        message: "Resource created.",
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error,
      });
    }
  }
  //listarSolitud por usuario
  async getByUser(req, res) {
    try {
      const data = await db.Resource.findAll({
        attributes: ["id","name","user","status"],
        where: {
          user: req.params.id,
        },
      });
      res.json(data)
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error,
      });
    }
  }

  async update(req, res) {
    try {
      const transition = req.body.transition;
      if(transition==="acepted" && req.body.id!="1")//id is ADMIN
      throw new Error("Invalid action to the user");
      const data = await db.Resource.findByPk(req.params.id);
      //Update fsm object
      data.fsmUpdate(fsm);
      console.log("Transitions possible: ", fsm.state, fsm.transitions());
      delete req.body.transition;
      //check transition possible
      if (fsm.can(transition)) {
        //Update fsm object
        fsm[transition]();
        await db.Resource.update(
          {
            status: fsm.state,
          },
          { where: { id: req.params.id } }
        );
        res.json({
          success: true,
          message: "Resource updated.",
        });
      } else {
        throw new Error("Invalid state transition");
      }
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error,
      });
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id;
      await db.Resource.destroy({
        where: { id },
      });
      res.send("Resource deleted.");
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error,
      });
    }
  }
}

module.exports = ResourceController;

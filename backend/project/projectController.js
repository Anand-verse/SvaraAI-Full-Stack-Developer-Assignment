import Project from "../models/Projectmodel.js";

export const createProject = async (req, res)=>{
    try {
         const { name, description } = req.body;
         
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
         
     const newProject = new Project({
      name,
      description,
      owner: req.user._id, 
    });

        await newProject.save();

        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(400).json({msg:'Project creation failed'})
    }
};

export const listProjects = async (req, res) => {
    try {
         const projects = await Project.find({ owner: req.user._id });
        res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching projects'});
    }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting project'});
  }
};
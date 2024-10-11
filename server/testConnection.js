import mongoose from 'mongoose';

const uri = "mongodb+srv://apk543211:9lqUI672YOTfAwS7@slot-booking.d889hko.mongodb.net/?retryWrites=true&w=majority&appName=slot-booking";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to MongoDB successful'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const courseSchema = new mongoose.Schema({ id: String, name: String });
const Course = mongoose.model('Course', courseSchema);

async function fetchCourses() {
    try {
        const courses = await Course.find();  // Using async/await here
        console.log('Courses fetched:', courses);
    } catch (err) {
        console.error('Error fetching courses:', err);
    }
    mongoose.disconnect();  // Disconnect after the operation
}

fetchCourses();  // Call the async function to perform the operation

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  userName: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  email: string;

  @Prop()
  name: string;
  
  @Prop()
  dateOfBirth:string

  
}

export const UserSchema = SchemaFactory.createForClass(User);
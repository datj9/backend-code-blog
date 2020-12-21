import { Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import Tag from "./tags.entity";

export default class TagRepository extends Repository<Tag> {
    private logger = new Logger("TagRepository")

}